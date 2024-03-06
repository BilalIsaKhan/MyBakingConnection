'use client'
import { ContextProviders } from 'context/ContextProviders'

// @ts-ignore: Unreachable code error
export default function ContextProvider({ children, shopId }) {
  return (
    // @ts-ignore: Unreachable code error
    <ContextProviders shopId={shopId}>{children}</ContextProviders>
  )
}
