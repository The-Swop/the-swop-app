import { Actor, HttpAgent, } from '@dfinity/agent'

// @ts-ignore
import { idlFactory, _SERVICE } from './swopBackend/backend.did'

import { BACKEND_CANISTER_ID, IC_HOST } from '../config'

export const getBackendActor = async () => {
  const agent = new HttpAgent({
    host: IC_HOST,
  })

  await agent.fetchRootKey()

  return Actor.createActor<_SERVICE>(idlFactory, {
    agent,
    canisterId: BACKEND_CANISTER_ID!,
  })
}