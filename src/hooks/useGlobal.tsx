import { useContext } from "react";
import GlobalContext from '@/contexts/global'

export default function useGlobal() {
  return useContext(GlobalContext)
}