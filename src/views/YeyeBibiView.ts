import { View } from '@varuntiwari/tomperjs';
import { YeyeBibi, YeyeBibiProps } from '../models/YeyeBibi';
import { YeyeBibiConverter } from '../utils/YeyeBibiGenerator';

export class YeyeBibiView extends View<YeyeBibi, YeyeBibiProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:#submit-encode': this.handleEncodeClick,
      'click:#submit-decode': this.handleDecodeClick,
      'click:#submit-copy': this.handleCopyClick,
      'click:#submit-clear-input': this.handleClearInputClick,
      'click:#submit-clear-output': this.handleClearOutputClick,
    };
  }

  handleEncodeClick = () => {
    if (this.model) {
      const textarea = this.parent.querySelector('#input') as HTMLInputElement;

      if (textarea) {
        const input = textarea.value;
        this.model.set({ input });

        const converter = new YeyeBibiConverter(input);

        converter.encode();

        const output = converter.output;

        if (output) {
          this.model.set({ output });
        }
      }
    }
  };

  handleDecodeClick = () => {
    if (this.model) {
      const textarea = this.parent.querySelector('#input') as HTMLInputElement;

      if (textarea) {
        const input = textarea.value;
        this.model.set({ input });

        const converter = new YeyeBibiConverter(input);

        converter.decode();

        const output = converter.output;

        if (output) {
          this.model.set({ output });
        }
      }
    }
  };

  handleClearInputClick = () => {
    const textarea = this.parent.querySelector('#input') as HTMLInputElement;

    if (textarea) {
      textarea.value = '';
    }
  };

  handleClearOutputClick = () => {
    const textarea = this.parent.querySelector('#output') as HTMLInputElement;

    if (textarea) {
      textarea.value = '';
    }
  };

  handleCopyClick = () => {
    let timeout;

    const textarea = this.parent.querySelector('#output') as HTMLInputElement;

    if (textarea) {
      const output = textarea.value;

      try {
        navigator.clipboard.writeText(output);

        const button = this.parent.querySelector('#submit-copy') as HTMLElement;

        if (button) {
          button.innerText = 'Copied ✔';

          clearTimeout(timeout);

          timeout = setTimeout(() => {
            button.innerText = 'Copy to clipboard';
          }, 5000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  template(): string {
    return `
    <main>
      <header>
        <div>Yeye-Bibi Generator</div>
      </header>
      <section id='input-section'>
        <h3>Input</h3>
        <textarea rows='5' id='input' placeholder='Enter some text'>${
          this.model?.get('input') ? this.model.get('input') : ''
        }</textarea>
        <button id='submit-encode'>Encode</button>
        <button id='submit-decode'>Decode</button>
        <button id='submit-clear-input'>Clear</button>
      </section>
      <section id='output-section'>
        <h3>Output</h3>
        <textarea rows='5' id='output' placeholder='Ouput'>${
          this.model?.get('output') ? this.model.get('output') : ''
        }</textarea>
        <button id='submit-copy'>Copy to clipboard</button>
        <button id='submit-clear-output'>Clear</button>
      </section>
      <footer>
        <div class='library'>
          <span>Build with</span>
          <image src='/yeyebibi-generator/tomper-js.svg' />
          <a href='https://github.com/varunKT001/tomperjs'>TomperJS</a>
        </div>
        <div class='links'>
          <a href='https://github.com/varunKT001/yeyebibi-generator.git'>Github</a>
          <a href='https://www.linkedin.com/in/varun-tiwari-454591178'>LinkedIn</a>
        </div>
      </footer>
    </main>
    `;
  }
}
