# generative1

A tool for producing generative (procedurally generated) MIDI files. 

## [Download Here](https://github.com/matdombrock/generative1/releases/latest)

## Generative music

> Generative : having the power or function of generating, originating, producing, or reproducing
- Websters Dictionary

> Generative music is a term popularized by Brian Eno to describe music that is ever-different and changing, and that is created by a system. 

- Wikipedia

If you are familiar with the "random" world generation in games like Minecraft and many other, then you already understand the basic idea at play here. These games use a technique known as [procedural generation](https://en.wikipedia.org/wiki/Procedural_generation) to build their world based on pseudo-random inputs (usually some kind of [noise](https://en.wikipedia.org/wiki/Perlin_noise)) and a set of rules.

This differs from full randomness because of the rule set at play. By setting clever rules, the developers of these games can generate seemingly plausible landscapes from this noise.  

Here we are applying the concept of procedural generation to create generative music instead of 3d worlds.

Note: According to the strictest interpretation of what "generative music" is, this software does not actually create generative music. This is because the midi files created here are inherently finite and truly generative music is infinite. 

## Screenshots

![demo/ss1.png](demo/ss1.png)
![demo/ss2.png](demo/ss2.png)
![demo/ss3.png](demo/ss3.png)
![demo/g1-demo.gif](demo/g1-demo.gif)

## Using the software

Head over to the [releases](https://github.com/matdombrock/generative1/releases/latest) section and grab the latest build. 

You will need to bypass the Windows security screen because this software is not signed. 

If you have doubts about security, feel free to build the software yourself from the source files. 

**Currently only Windows is supported but other operating systems are fully possible down the road.** 

-------

## Development Info

This is a Vue/Electron project. It uses the [Vue Electron Builder Plugin](https://nklayman.github.io/vue-cli-plugin-electron-builder/) for building. 


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run electron:build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
