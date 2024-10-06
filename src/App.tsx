import { locales } from "@blocknote/core";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect, useMemo, useState } from "react";

async function saveToStorage(jsonBlocks: Block[]) {
    // ローカルストレージにコンテンツを保存する。
    // 場合に応じてAPIやデータベースに保存するように変更する。
    localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
}

async function loadFromStorage() {
    // 前のエディターの内容を取得する。
    const storageString = localStorage.getItem("editorContent");
    return storageString ? (JSON.parse(storageString) as PartialBlock[]) : undefined;
}

export default function App() {
    const [initialContent, setInitialContent] = useState<PartialBlock[] | undefined | "loading">("loading");

    // 前のエディターの内容をロードする。
    useEffect(() => {
        loadFromStorage().then((content) => {
            setInitialContent(content);
        });
    }, []);

    // 初期コンテンツがロードされるまでエディターの作成を遅らせるようにするため、
    // useCreateBlockNoteを使わずにuseMemo + createBlockNoteEditorを使う。
    const editor = useMemo(() => {
        if (initialContent === "loading") {
            return undefined;
        }
        return BlockNoteEditor.create({
            initialContent: initialContent,
            dictionary: locales.ja,
        });
    }, [initialContent]);

    if (editor === undefined) {
        return "Loading content...";
    }

    return (
        <BlockNoteView
            editor={editor}
            onChange={() => {
                saveToStorage(editor.document);
            }}
        />
    );
}
