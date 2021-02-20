/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import * as React from "react"
import { createMachine, useMachine } from "../src"

export default {
  title: "Machine",
}

const counter = createMachine(
  {
    context: { count: 0 },
    on: {
      DEC: { cond: "isAboveMin", actions: "decrementCount" },
      INC: { actions: "incrementCount" },
    },
  },
  {
    computed: {
      formatted(ctx) {
        return `$${ctx.count}`
      },
    },
    actions: {
      decrementCount(context) {
        context.count--
      },
      incrementCount(context) {
        context.count++
      },
    },
    guards: {
      isAboveMin(context) {
        return context.count > 0
      },
    },
  },
)

export const Counter = () => {
  const [state, send] = useMachine(counter)
  return (
    <div>
      <pre>{JSON.stringify(state, null, 3)}</pre>
      <button onClick={() => send("INC")}>INC</button>
      <button onClick={() => send("DEC")}>DEC</button>
    </div>
  )
}

const checkbox = createMachine<{}, "checked" | "unchecked">({
  initial: "unchecked",
  states: {
    checked: {
      on: { CLICK: "unchecked" },
    },
    unchecked: {
      on: { CLICK: "checked" },
    },
  },
})

export const Checkbox = () => {
  const [state, send] = useMachine(checkbox)
  return (
    <div>
      <pre>{JSON.stringify(state, null, 3)}</pre>
      <button onClick={() => send("CLICK")}>CLICK</button>
    </div>
  )
}

type PressableState = "hover" | "pressIn" | "idle" | "longPressIn"

const pressable = createMachine<{}, PressableState>({
  initial: "idle",
  states: {
    idle: {
      on: {
        pointerover: "hover",
      },
    },
    hover: {
      on: {
        pointerleave: "idle",
        pointerdown: "pressIn",
      },
    },
    pressIn: {
      after: {
        500: "longPressIn",
      },
      on: {
        pointerup: "hover",
      },
    },
    longPressIn: {
      on: {
        pointerup: "hover",
        pointerleave: "idle",
      },
    },
  },
})

export const Pressable = () => {
  const [state, send] = useMachine(pressable)
  return (
    <div>
      <button
        style={{
          color: "white",
          background: state.matches(["pressIn", "longPressIn"])
            ? "green"
            : "blue",
        }}
        onPointerOver={() => send("pointerover")}
        onPointerLeave={() => send("pointerleave")}
        onPointerDown={() => send("pointerdown")}
        onPointerUp={() => send("pointerup")}
      >
        Welcome
      </button>
      <pre>{JSON.stringify(state, null, 3)}</pre>
    </div>
  )
}
