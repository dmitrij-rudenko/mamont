
![alt text](assets/logo.png "Title")

A simple development server for static websites 🤘

## Installation

```sh
npm install -g mamont
```

## Usage

Running `mamont` without any arguments will host the current directory as a static web site on any free port. Navigating to the server will render your `index.html`, if that file exists.

```
$ mamont
```

## Usage without installation

```
$ npx mamont
```

## Options

`-p` - Make the web server accessible from the port you specified.  
`-t` -	Starting with a specific document root directory.  
`-h` -	Show help.  

Example:

```
$ mamont -p 3000
```