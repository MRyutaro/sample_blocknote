import { locales } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

export default function App() {
    // Creates a new editor instance.
    const editor = useCreateBlockNote({
        dictionary: locales.ja,
    });

    // Renders the editor instance using a React component.
    return <BlockNoteView editor={editor} />;
}
