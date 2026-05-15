"use client"

import { useEffect } from "react"

export default function PlausibleScript() {
  useEffect(() => {
    window.plausible =
      window.plausible ||
      function () {
        ;(window.plausible!.q = window.plausible!.q || []).push(arguments as unknown as IArguments)
      }
  }, [])

  return null
}
