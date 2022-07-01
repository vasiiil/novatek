export interface ITab {
  route: string,
  name: string,
  visible: boolean,
  needLoad: boolean
}

export type getTabByRouteType = (route: string) => ITab|undefined
export type setTabDataLoadedType = (route: string) => void
