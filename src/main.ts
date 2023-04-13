// import { App, Modal, Plugin, PluginSettingTab, Setting, MarkdownPostProcessorContext } from 'obsidian';
import { Plugin, MarkdownPostProcessorContext } from 'obsidian';
import { HaradaMethod } from "./harada";

// Remember to rename these classes and interfaces!

// interface ObsidianHaradaMethodPluginSettings {
// 	mySetting: string;
// }

// const DEFAULT_SETTINGS: ObsidianHaradaMethodPluginSettings = {
// 	mySetting: 'default'
// }

export default class ObsidianHaradaMethodPlugin extends Plugin {
	// settings: ObsidianHaradaMethodPluginSettings;

	async process (source: string, element: HTMLElement, context: MarkdownPostProcessorContext) {
		context.addChild(new HaradaMethod(element, source));
	}

	async onload() {
		// await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor("harada", this.process)
	}

	onunload() {

	}

	// async loadSettings() {
	// 	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	// }

	// async saveSettings() {
	// 	await this.saveData(this.settings);
	// }
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


// class SampleSettingTab extends PluginSettingTab {
// 	plugin: ObsidianHaradaMethodPlugin;

// 	constructor(app: App, plugin: ObsidianHaradaMethodPlugin) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		const {containerEl} = this;

// 		containerEl.empty();
// 		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

// 		new Setting(containerEl)
// 			.setName('Setting #1')
// 			.setDesc('It\'s a secret')
// 			.addText(text => text
// 				.setPlaceholder('Enter your secret')
// 				.setValue(this.plugin.settings.mySetting)
// 				.onChange(async (value) => {
// 					console.log('Secret: ' + value);
// 					this.plugin.settings.mySetting = value;
// 					await this.plugin.saveSettings();
// 				}));
// 	}
// }
