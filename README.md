# useState+
An extended version of React's useState hook with extra tools

useState+ is simply an extension of the useState hook that will allow for cleaner code that is easier to read and write for all kinds of web applications.

Works with TypeScript too!

## Features

* **Single Line State Initialization** Instead of calling useState on multiple lines for each useState call, developers can pass a single object with key value pairs of the initial state just like in class components.

* **Getter and Setter Functions** Developers that prefer using methods that mimic encapsulation similar to those used in languages like Java can now use getters and setters to retrieve and set state, so naming conventions are consistent across the codebase.

* **Setting multiple states in a single call** Instead of calling state setting functions one by one in event handlers, developers can pass any form of state that they want in a single object like in class components to mutate the state. 

* **Built-in state resetting functions** Functions that reset both a single variable in the state or the entire state are available in this package. 

## How to use

Here is how to initialize state using useState+:

```jsx 
    const { ticker } = useStatePlus({ ticker: 0 });

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

This tool is still very young and not production ready! Please feel free to report bugs and open PRs to improve this tool.

Thanks!

