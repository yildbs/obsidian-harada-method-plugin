import { MarkdownRenderChild } from "obsidian";

export class HaradaMethod extends MarkdownRenderChild {
  text: string;

  constructor(containerEl: HTMLElement, text: string) {
    super(containerEl);

    this.text = text;
  }

  parse(){

    let goal = '';
    const keyplans: string[] = new Array<string>(8).fill("-");
    const actions: string[][] = new Array<string[]>(8);
    for (let i = 0; i < actions.length; i++) {
      actions[i] = new Array<string>(8).fill("-");
    }

    const lines = this.text.split("\n");
    let current_keyplans_index = -1;
    let current_actions_index = -1;
    for (const line of lines){
      const leading_space = line.match(/^(\s+)/);
      let leading_space_length = 0;
      if (leading_space != null){
        leading_space_length = leading_space[0].length;
      }
      const level = leading_space_length / 2;
      if( Number.isInteger(level) == false) {
        // error
        break;
      }

      if (level == 0){
        if (goal == ''){
          goal = line;
        }
      }
      else if (level == 1){
        current_keyplans_index += 1;
        current_actions_index = -1;
        if (current_keyplans_index <= 8){
          keyplans[current_keyplans_index] = line.trim();
        }
      }
      else if (level == 2){
        current_actions_index += 1;
        if (current_actions_index <= 8){
          actions[current_keyplans_index][current_actions_index] = line.trim();
        }
      }
    }

    return {
      "goal": goal,
      "keyplans" :keyplans,
      "actions": actions
    }
  }

  onload() {

    const table = document.createElement('table');
    table.id = 'harada';
    const {goal, keyplans, actions} = this.parse();

    // Create 9 rows and 9 cells in each row
    for (let y = 0; y < 9; y++) {
      // Create a table row keyplan
      const row = document.createElement('tr');

      // Create 9 table cell keyplans and add them to the row
      for (let x = 0; x < 9; x++) {
        let content = '';

        const box_index = Math.floor(x / 3) + Math.floor(y / 3) * 3;
        const inbox_index = (x % 3) + (y % 3) * 3;

        const cell = document.createElement('td');
        cell.classList.add('cell');

        if((y % 3) == 0){
          cell.classList.add('top');
        }
        if((y % 3) == 2){
          cell.classList.add('bottom');
        }
        if((x % 3) == 0){
          cell.classList.add('left');
        }
        if((x % 3) == 2){
          cell.classList.add('right');
        }

        if(box_index == 4 && inbox_index == 4){
          content = goal;
          cell.id = 'goal';
        }
        else if(box_index == 4){
          let keyplan_index = inbox_index;
          if(inbox_index > 4){
            keyplan_index = inbox_index - 1;
          }
          content = keyplans[keyplan_index];
          cell.id = 'keyplan';
        }
        else if(inbox_index == 4){
          let keyplan_index = box_index;
          if(box_index > 4){
            keyplan_index = box_index - 1;
          }
          content = keyplans[keyplan_index];
          cell.id = 'keyplan';
        }
        else{
          let keyplan_index = box_index;
          if(box_index > 4){
            keyplan_index = box_index - 1;
          }
          let action_index = inbox_index;
          if(inbox_index > 4){
            action_index = inbox_index - 1;
          }

          try{
            content = actions[keyplan_index][action_index];
          }
          catch(err){
            console.log(err);
          }
          cell.id = 'action';
        }

        cell.textContent = content;
        row.appendChild(cell);
      }

      // Add the row to the table
      table.appendChild(row);
    }

    this.containerEl.replaceWith(table);
  }
}