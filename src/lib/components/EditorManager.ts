import InlineTextEditor from "$lib/components/InlineTextEditor.svelte";
import InlineOptionsSelect from "$lib/components/InlineOptionsSelect.svelte";
import InvalidEditor from "$lib/components/InvalidEditor.svelte";
import InlineDatePicker from "$lib/components/InlineDatePicker.svelte";
import InlineNumberEditor from "$lib/components/InlineNumberEditor.svelte";
import InlineDateTimePicker from "$lib/components/InlineDateTimePicker.svelte";
import InlineOptionsMultiSelect from "$lib/components/InlineOptionsMultiSelect.svelte";
import InlineCheckbox from "$lib/components/InlineCheckbox.svelte";

class EditorManager {

    private map: Map<string, any>;
    constructor() {
        this.map = new Map<string, any>();
    }


    getRender(type: string): any {
        return this.map.get(type) ?? InvalidEditor;
    }

    register(type: string, render: any) {
        this.map.set(type, render);
    }
}

const editorManager = new EditorManager();

editorManager.register('text', InlineTextEditor);
editorManager.register('number', InlineNumberEditor);
editorManager.register('date', InlineDatePicker);
editorManager.register('boolean', InlineCheckbox);
editorManager.register('date-time', InlineDateTimePicker);
editorManager.register('options-selector', InlineOptionsSelect);
editorManager.register('multi-select', InlineOptionsMultiSelect)

export default editorManager;