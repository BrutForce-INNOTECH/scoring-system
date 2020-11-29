export interface AdviceItem {
  id: string;
  name: string;
  percent: string
}

export interface Result {
  fio: string;
  position: string;
  image: string
  vk?: string;
  fb?: string;
  inn?: string;
  fssp?: string;
  bankrot?: string;
  advices: AdviceItem[]
}

export const labelByResult = (key: keyof Result): string => {
  switch (key) {
    case "vk":
      return "ВКонтакте"
    case "fb":
      return "Фейсбук"
    case "inn":
      return "ИНН"
    case "fssp":
      return "ФССП по физ.лицам"
    case "bankrot":
      return "Банкрот"
    default:
      return ""
  }
}

export const createResultByRaw = (obj: any): Result => {
  return defaultResult
}

export const defaultResult = {
  fio: "Варламов Илья Александрович",
  position: "журналист, путешественник, блогер",
  image: "http://82.148.19.167:25478//files/test_image.jpg?token=45e9efce34a84a478f298a80b00b6dae",
  vk: "dfdfdf",
  fb: "dfdfdf",
  inn: "dfdfdf",
  fssp: "dfdfdf",
  bankrot: "dfdfdf",
  advices: [
    {
      id: "1",
      name: "Услуга Ипотека",
      percent: "60%"
    }
  ]

} as Result;