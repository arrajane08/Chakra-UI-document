import { useUpdateEffect } from "@chakra-ui/hooks"
import {
  ensureFocus,
  getAllTabbable,
  getFirstTabbableIn,
  isTabbable,
} from "@chakra-ui/utils"
import * as React from "react"

export function hasFocusWithin(
  ref: React.RefObject<HTMLElement>,
  event: React.FocusEvent,
) {
  if (!document.activeElement || !ref || !ref.current) return false

  const hasFocus =
    ref.current &&
    ref.current.contains(
      (event.relatedTarget || document.activeElement) as HTMLElement,
    )

  return hasFocus
}

export function useBlurOutside(
  buttonRef: React.RefObject<HTMLButtonElement>,
  containerRef: React.RefObject<HTMLElement>,
  options: {
    action: () => void
    visible: boolean
  },
) {
  React.useEffect(() => {
    const element = buttonRef.current
    if (!element) return undefined

    const preventDefault = (event: MouseEvent) => event.preventDefault()
    element.addEventListener("mousedown", preventDefault)

    return () => {
      element.removeEventListener("mousedown", preventDefault)
    }
  }, [buttonRef])

  return (event: React.FocusEvent) => {
    const shouldClose = options.visible && !hasFocusWithin(containerRef, event)
    if (shouldClose) {
      options.action()
    }
  }
}

export function useFocusOnHide(
  ref: React.RefObject<HTMLElement>,
  options: any,
) {
  const { focusRef, autoFocus, visible } = options
  const shouldFocus = autoFocus && !visible

  useUpdateEffect(() => {
    const element = ref.current
    if (!shouldFocus || !element) return undefined
    const preventFocus =
      document.activeElement &&
      element &&
      !element.contains(document.activeElement) &&
      isTabbable(document.activeElement)

    if (preventFocus) return

    const focusEl = focusRef?.current

    if (focusEl) {
      focusEl.focus()
    }
  }, [autoFocus, focusRef, visible, ref])
}

export function getElementAfterTrigger(
  triggerRef: React.RefObject<HTMLElement>,
) {
  if (!triggerRef.current) return
  const elements = document && getAllTabbable(document.body)
  const targetIndex =
    elements && triggerRef.current ? elements.indexOf(triggerRef.current) : -1
  return elements && elements[targetIndex + 1]
}

export interface FocusOnShowHookOptions {
  autoFocus?: boolean
  visible?: boolean
  focusRef?: React.RefObject<HTMLElement>
}

export function useFocusOnShow(
  ref: React.RefObject<HTMLElement>,
  options: FocusOnShowHookOptions,
) {
  const { visible, autoFocus, focusRef } = options

  useUpdateEffect(() => {
    const shouldFocus = visible && autoFocus

    if (!shouldFocus) return

    if (focusRef?.current) {
      ensureFocus(focusRef.current)
      return
    }

    if (ref.current) {
      const firstTabbable = getFirstTabbableIn(ref.current, true)
      ensureFocus(firstTabbable ?? ref.current)
    }
  }, [visible, autoFocus, ref, focusRef])
}
