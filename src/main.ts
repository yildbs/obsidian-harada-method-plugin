import { Plugin, MarkdownPostProcessorContext, PluginSettingTab, App, Setting, ColorComponent } from 'obsidian';
import { HaradaMethod } from "./harada";

// Remember to rename these classes and interfaces!

interface ObsidianHaradaMethodPluginSettings {
	goalColor: string;
	keyplanColor: string;
	actionColor: string;
}

const DEFAULT_SETTINGS: ObsidianHaradaMethodPluginSettings = {
	goalColor: "#FFE5AC",
	keyplanColor: '#EFFFC9',
	actionColor: '#FFFFFF',
}

export default class ObsidianHaradaMethodPlugin extends Plugin {
	settings: ObsidianHaradaMethodPluginSettings;

	async process (source: string, element: HTMLElement, context: MarkdownPostProcessorContext) {
		context.addChild(new HaradaMethod(element, source));
	}

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new ObsidianHaradaMethodPluginSettingTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor("harada", this.process)
	}

	onunload() {

	}

	async applySettings(){
		Array.from(document.getElementsByClassName("goal")).forEach((element) => {
			(element as HTMLElement).style.backgroundColor = this.settings.goalColor;
		});

		Array.from(document.getElementsByClassName("keyplan")).forEach((element) => {
			(element as HTMLElement).style.backgroundColor = this.settings.keyplanColor;
		});

		Array.from(document.getElementsByClassName("action")).forEach((element) => {
			(element as HTMLElement).style.backgroundColor = this.settings.actionColor;
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		this.applySettings();
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.applySettings();
	}
}

// class SampleModal extends Modal {
// 	constructor(app: App) {
// 		super(app);
// 	}

// 	onOpen() {
// 		const {contentEl} = this;
// 		contentEl.setText('Woah!');
// 	}

// 	onClose() {
// 		const {contentEl} = this;
// 		contentEl.empty();
// 	}
// }


class ObsidianHaradaMethodPluginSettingTab extends PluginSettingTab {
	plugin: ObsidianHaradaMethodPlugin;

	constructor(app: App, plugin: ObsidianHaradaMethodPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();
		containerEl.createEl('h2', {text: 'Draw Harada Method Plugin Settings'});

		new Setting(containerEl)
			.setName('Goal Color')
			.setDesc('Goal Color')
			.addColorPicker(cb => cb
				.setValue(this.plugin.settings.goalColor)
				.onChange(async (value) => {
					this.plugin.settings.goalColor = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Keyplan Color')
			.setDesc('Keyplan Color')
			.addColorPicker(cb => cb
				.setValue(this.plugin.settings.keyplanColor)
				.onChange(async (value) => {
					this.plugin.settings.keyplanColor = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Action Color')
			.setDesc('Action Color')
			.addColorPicker(cb => cb
				.setValue(this.plugin.settings.actionColor)
				.onChange(async (value) => {
					this.plugin.settings.actionColor = value;
					await this.plugin.saveSettings();
				}));
	}
}
