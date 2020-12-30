# useState+

useState+ is simply an extension of the useState function that allows developers to abstract away many commonly implemented features of this popular React hook. 

This package aims to improve readability of functional components in React, and make state management easier within single functional components.

## Features

* **Single Line State Initialization** Instead of calling useState on multiple lines, developers can pass a single object with key value pairs of the initial state just like in class components.

* **Getter and Setter Functions** Developers that prefer using methods that mimic encapsulation similar to those used in languages like Java can now use getters and setters to retrieve and set state, so naming conventions are consistent across the codebase.

* **Setting multiple states in a single call** Instead of calling state setting functions one by one in event handlers, developers can pass any form of state that they want in a single object like in class components to mutate the state. 

* **Built-in history navigation and memory retention of state** Perhaps the strongest feature of this library, there are functions that allow simple resetting of state without needing to remember the initial state. In addition, functions that allow for navigation of history in the state without the use of an exernal router (a feature that can be beneficial for those who develop standalone Electron applications that don't rely on the URI for maintaining history) are available.

## How to use

Here is how to initialize state using useState+:

```tsx 

    import useStatePlus from 'use-state-plus';

    interface MyInterface {
      ticker: number;
    }
    const { ticker } = useStatePlus<MyInterface>({ ticker: 0 });

    //You call getter and setter methods to manipulate state like this:

    const tickerVal = ticker.get();

    return (
        <div>
            <button onClick={() => ticker.set(tickerVal + 1)}>
                Clicked {tickerVal} Times.
                </button>
            <button onClick={() => ticker.reset()}>
                Click to Reset.
                </button>
        </div>
    )
```

You can also use methods included in useState+ to manipulate multiple values in state like this: 

```jsx 
    const { ticker, switcher, getAll, multiSet, resetAll } = useStatePlus({ ticker: 0, switcher: 'off' });

    //You call the getAll method to condense getters into one call:

    const state = getAll();

    return (
        <div>
            <button
                onClick={() => {
                    multiSet({
                        ticker: state.ticker + 1,
                        switcher: state.switcher === 'off' ? 'on' : 'off'
                    })
                }}>
                Clicked {state.ticker} Times. Switch is {state.switcher}.
            </button>
            <button onClick={() => resetAll()}>
                Click to Reset State.
            </button>
        </div>
    )
```

These additional functions exist as well (pretty straight forward, but documentation coming soon!)

```jsx
      <button onClick={() => { multiReset(['switcher', 'times'])}}>Reset two.</button>
      <button onClick={() => { goBack() }}>Go Back 1.</button>
      <button onClick={() => { goForward(2) }}>Go Forward 2.</button>
```



