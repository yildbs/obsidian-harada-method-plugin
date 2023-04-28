import { Plugin, MarkdownPostProcessorContext, PluginSettingTab, App, Setting, ColorComponent, TextComponent } from 'obsidian';
import { HaradaMethod } from "./harada";

// Remember to rename these classes and interfaces!

interface ObsidianHaradaMethodPluginSettings {
	goalBackgroundColor: string;
	keyplanBackgroundColor: string;
	actionBackgroundColor: string;
	goalTextColor: string;
	keyplanTextColor: string;
	actionTextColor: string;
}

const DEFAULT_SETTINGS: ObsidianHaradaMethodPluginSettings = {
	goalBackgroundColor: "#FFE5AC",
	keyplanBackgroundColor: '#EFFFC9',
	actionBackgroundColor: '#FFFFFF',
	goalTextColor: "#000000",
	keyplanTextColor: '#000000',
	actionTextColor: '#00000',
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
			(element as HTMLElement).style.backgroundColor = this.settings.goalBackgroundColor;
			(element as HTMLElement).style.color = this.settings.goalTextColor;
		});

		Array.from(document.getElementsByClassName("keyplan")).forEach((element) => {
			(element as HTMLElement).style.backgroundColor = this.settings.keyplanBackgroundColor;
			(element as HTMLElement).style.color = this.settings.keyplanTextColor;
		});

		Array.from(document.getElementsByClassName("action")).forEach((element) => {
			(element as HTMLElement).style.backgroundColor = this.settings.actionBackgroundColor;
			(element as HTMLElement).style.color = this.settings.actionTextColor;
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
		containerEl.createEl('h2', {text: 'Colors'});

		new Setting(containerEl)
			.setName('Goal Background Color')
			.addColorPicker(cb => cb
				.setValue(this.plugin.settings.goalBackgroundColor)
				.onChange(async (value) => {
					this.plugin.settings.goalBackgroundColor = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Goal Text Color')
			.addColorPicker(cb => cb
				.setValue(this.plugin.settings.goalTextColor)
				.onChange(async (value) => {
					this.plugin.settings.goalTextColor = value;
					await this.plugin.saveSettings();

				}));

		new Setting(containerEl)
			.setName('Keyplan Background Color')
			.addColorPicker(cb => cb
				.setValue(this.plugin.settings.keyplanBackgroundColor)
				.onChange(async (value) => {
					this.plugin.settings.keyplanBackgroundColor = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Keyplan Text Color')
			.addColorPicker(cb => cb
				.setValue(this.plugin.settings.keyplanTextColor)
				.onChange(async (value) => {
					this.plugin.settings.keyplanTextColor = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Action Background Color')
			.addColorPicker(cb => cb
				.setValue(this.plugin.settings.actionBackgroundColor)
				.onChange(async (value) => {
					this.plugin.settings.actionBackgroundColor = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Action Text Color')
			.addColorPicker(cb => cb
				.setValue(this.plugin.settings.actionTextColor)
				.onChange(async (value) => {
					this.plugin.settings.actionTextColor = value;
					await this.plugin.saveSettings();
				}));

	}
}
