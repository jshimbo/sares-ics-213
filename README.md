# ICS-213 Web Form

A browser-based version of form ICS-213.

## Features

- Emulates the Santa Clara County (California) ARES/RACES Form ICS-213.
- Tab through the fields in the SCCo specified order.
- Easier to use than PDF forms.
- Works off-line, i.e., on a computer without network connections.
- Save and restore form data to/from a JSON files.
- Print to a single sheet of paper.

## Usage

This project is primarily intended for receiving Form ICS-213 messages over amateur radio. It will run on almost any operating system with a modern web browser. Open the web page in your browser and fill in the fields and print to paper or PDF.

Optionally, you can save the form contents to a JSON and read them back in.

To reset the form, do a hard refresh in your browser, e.g., shift-ctrl-R or shift-cmd-R.

Operator name and callsign are saved to cookies. Dates and times can be automatically filled.

Some layout quirks arise from the requirement to print a single page.

If you bundle the Javascript and CSS files into the HTML file, you can use it without a web server, i.e., use the browser's File->Open function.

## Development

You can develop this project with just a text editor but a Javascript bundler will facilitate development, espcially when combining all the files (HTML, CSS, and JS) into one.

To use this app without a web server, browser security policies require the CSS and Javascript to be bundled in the HTML file.

### Setting Up a Development Environment

This project used [Vite](https://vitejs.dev/) and its [vite-plugin-singlefile](https://www.npmjs.com/package/vite-plugin-singlefile) plugin during development.

1. Clone this repository
2. Install [node.js](https://nodejs.org/)
3. Enter the project's directory
4. Install packages: `npm install`
5. Start the dev server: `npm run dev`
6. Open the URL shown, usually http://localhost:5173.
7. Start developing. Any changes to the source code will instantly appear in the browser.
8. To build a production version: `npm run build`. The output will be `dist/index.html`.

Linux, macOS, and Windows are supported.

### Vanilla Javascript

This project uses no third-party Javascript libraries, simplifying code maintenance.

### CSS

This project uses the [PureCSS library](https://purecss.io/) for grids and forms.

### Tests

None currently available.

## Acknowledgements

This project was inspired by [Pacforms](https://www.scc-ares-races.org/pfpublic/pacforms). The original code is from [Winlink Express Forms](https://winlink.org/WinlinkExpressForms).

## Licenses

Since the Winlink Express Forms template code is in the public domain, this project (except the PureCSS library) is also in the public domain.

The PureCSS library is licensed under the BSD license. Please see the LICENSE file.
