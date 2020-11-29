export interface ResultCity {
  id: number;
  title: string;
}

export interface ResultCountry {
  id: number;
  title: string;
}

export interface ResultOccupation {
  id: number;
  name: string;
  type: string;
}

export interface ResultPersonal {
  alcohol: number;
  inspired_by: string;
  langs: string[];
  life_main: number;
  people_main: number;
  political: number;
  religion: string;
  religion_id: number;
  smoking: number;
}

export interface ResultUniversity {
  chair: number;
  chair_name: string;
  city: number;
  country: number;
  education_form: string;
  education_status: string;
  faculty: number;
  faculty_name: string;
  graduation: number;
  id: number;
  name: string;
}

export interface ResultRelative {
  type: string;
  id: number;
}

export interface AdviceItem {
  id: string;
  name: string;
  percent: string
}

export interface Person {
  first_name: string;
  id: number;
  last_name: string;
  can_access_closed: boolean;
  is_closed: boolean;
  sex: number;
  screen_name: string;
  verified: number;
  nickname: string;
  domain: string;
  bdate: string;
  city: ResultCity;
  country: ResultCountry;
  photo_max_orig: string;
  has_photo: number;
  interests: string;
  quotes: string;
  activities: string;
  mobile_phone: string;
  home_phone: string;
  site: string;
  occupation: ResultOccupation;
  military: any[];
  university: number;
  university_name: string;
  faculty: number;
  faculty_name: string;
  graduation: number;
  education_form: string;
  education_status: string;
  home_town: string;
  relation: number;
  personal: ResultPersonal;
  universities: ResultUniversity[];
  schools: any[];
  relatives: ResultRelative[];


}

export interface Result {
  age?: number;
  score?: number;
  data: Person
  BDIP?: any;
  advices?: any[]
}

export const fioByPerson = (result: Person): string => {
  return `${result.last_name} ${result.first_name}`
}

export const universityByPerson = (result: Person): string | undefined => {
  if (!result.university) return undefined;
  const un = result.universities?.find(x => x.id === result.university);
  return un ? un.name : undefined
}

export const labelByPersonKey = (key: keyof Person): string => {
  switch (key) {
    case "last_name":
      return "Фамилия"
    case "first_name":
      return "Отчество"
    case "home_town":
      return "Родной город"
    case "city":
      return "Город"
    case "country":
      return "Страна";
    case "faculty":
      return "Факультет"
    case "faculty_name":
      return "Название факультета"
    case "occupation":
      return "Занятость";
    case "university":
      return "Университет"
    case "bdate":
      return "Возраст"
    default:
      return ""
  }
}

export const createResultByRaw = (obj: any): Result => {
  return obj as Result
}

export const defaultResult = {
  "age": 0,
  "data": {
    "first_name": "Николай",
    "id": 42061391,
    "last_name": "Ромадов",
    "can_access_closed": true,
    "is_closed": false,
    "sex": 2,
    "screen_name": "friomusic",
    "verified": 1,
    "nickname": "",
    "domain": "friomusic",
    "bdate": "10.5",
    "city": {"id": 954, "title": "Марьино"},
    "country": {"id": 1, "title": "Россия"},
    "photo_max_orig": "https://sun1-92.userapi.com/impg/c857324/v857324029/57cea/zp5wcUjoXkI.jpg?size=400x0&quality=90&crop=146,0,279,292&sign=527a2284ba31b366add31a5937aef0ed&c_uniq_tag=QAcdzhAk4Pw9-vfma6aowM1HAklg_JgfM1u3jgF0vAI&ava=1",
    "has_photo": 1,
    "has_mobile": 1,
    "interests": "_XXXXXXXXXX________XXXXXXXXXX\t__XXXXXXXXXX______XXXXXXXXXX\t___XXXXXXXXXX____XXXXXXXXXX\t_____XXXXXXXXXX_XXXXXXXXX\t_______XXXXXXXXXXXXXXXXX\t________XXXXXXXXXXXXXXXX\t_______XXXXXXXXXXXXXXXXX\t______XXXXXXXXX_XXXXXXXXX\t_____XXXXXXXXX___XXXXXXXXX\t____XXXXXXXXX_____XXXXXXXXX\t___XXXXXXXXX_______XXXXXXXXX\t_XXXXXXXXX-__________XXXXXXXXX\t.\t.\t.\t_XXXXXXXXXX________XXXXXXXXXX\t__XXXXXXXXXX______XXXXXXXXXX\t___XXXXXXXXXX____XXXXXXXXXX\t_____XXXXXXXXXX_XXXXXXXXX\t_______XXXXXXXXXXXXXXXXX\t________XXXXXXXXXXXXXXXX\t_______XXXXXXXXXXXXXXXXX\t______XXXXXXXXX_XXXXXXXXX\t_____XXXXXXXXX___XXXXXXXXX\t____XXXXXXXXX_____XXXXXXXXX\t___XXXXXXXXX_______XXXXXXXXX\t_XXXXXXXXX-__________XXXXXXXXX\t.\t.\t.\t_XXXXXXXXXX________XXXXXXXXXX\t__XXXXXXXXXX______XXXXXXXXXX\t___XXXXXXXXXX____XXXXXXXXXX\t_____XXXXXXXXXX_XXXXXXXXX\t_______XXXXXXXXXXXXXXXXX\t________XXXXXXXXXXXXXXXX\t_______XXXXXXXXXXXXXXXXX\t______XXXXXXXXX_XXXXXXXXX\t_____XXXXXXXXX___XXXXXXXXX\t____XXXXXXXXX_____XXXXXXXXX\t___XXXXXXXXX_______XXXXXXXXX\t_XXXXXXXXX-__________XXXXXXXXX\t.\t.\t.\tXXXXXXXXXXXXXX\tXXXXXXXXXXXXXX\tXXXXXXXXXXXXXX\t______XXXXX\t______XXXXX\t______XXXXX\t______XXXXX\t______XXXXX\t______XXXXX\t______XXXXX\t______XXXXX\t.\t.\tXXXXXXXXXXXXXX\tXXXXXXXXXXXXXX\tXXXXXXXX\tXXXXXXXX\tXXXXXXXXXXXX\tXXXXXXXXXXXX\tXXXXXXXX\tXXXXXXXX\tXXXXXXXXXXXXXX\tXXXXXXXXXXXXXX\t.\t.\tXXXXXXXX___________XXXX\tXXXXXXXXX__________XXXX\tXXXXX_XXXX_________XXXX\tXXXXX__XXXX________XXXX\tXXXXX___XXXX_______XXXX\tXXXXX____XXXX______XXXX\tXXXXX_____XXXX_____XXXX\tXXXXX______XXXX____XXXX\tXXXXX_______XXXXXXXXXX\tXXXXX________XXXXXXXXXX \t.\t.\tXXXXXXXXXXXXXX\tXXXXXXXXXXXXXX\tXXXXXXXXXXXXXX\t______XXXXX\t______XXXXX\t______XXXXX\t______XXXXX\t______XXXXX\t______XXXXX\t______XXXXX\t______XXXXX\t\t\t_________XXXXXX\t________XXXXXXXX\t_______XXXXXXXXXX\t______XXXXXXXXXXX\t_____XXXXXXXXXXXX\t____XXXXX_____XXXX\t___XXXXXXXXXXXXXX\t__XXXXXXXXXXXXXXX\t_XXXXX________XXXXX\tXXXXX_________XXXXX\t.\t.\t_____XXXXXXXXXX\t___XXXXXXXXXXXXXX\t_XXXXXXXXXXXXXXXXX\tXXXXXXXXXXXXXXXXXXX\tXXXXXXX_________XXXXXX\tXXXXXXX\tXXXXXXX\tXXXXXXX\tXXXXXXX\tXXXXXXX_________XXXXXX\tXXXXXXXXXXXXXXXXXXX\t_XXXXXXXXXXXXXXXXXX\t___XXXXXXXXXXXXXXXX\t_____XXXXXXXXXXX\t.\t.\t________XXXXXXX\t________XXXXXXX\t________XXXXXXX\t________XXXXXXX\t________XXXXXXX\t________XXXXXXX\t________XXXXXXX\t________XXXXXXX\t________XXXXXXX\t________XXXXXXX \t________XXXXXXX\t.\t.\t ______XXXXXXXXXXX\t____XXXXXXXXXXXXXX\t___XXXXXXXXXXXXXXXXX\t__XXXX_______________XXXX\t_XXXX_________________XXXX\tXXXX___________________XXXX\tXXXX___________________XXXX\tXXXXX__________________XXXX     \t_XXXXX_________________XXX\t__XXXXX______________XXXX\t___XXXXXXXXXXXXXXxXXX\t_____XXXXXXXXXXXXXX\t_______XXXXXXXXXXX\t.\t.\tXXXXXXXX___________XXXX\tXXXXXXXXX__________XXXX\tXXXXX_XXXX_________XXXX\tXXXXX__XXXX________XXXX\tXXXXX___XXXX_______XXXX\tXXXXX____XXXX______XXXX\tXXXXX_____XXXX_____XXXX\tXXXXX______XXXX____XXXX\tXXXXX_______XXXXXXXXXX\tXXXXX________XXXXXXXXXX",
    "quotes": "_XXXXXXXXXX________XXXXXXXXXX\n__XXXXXXXXXX______XXXXXXXXXX\n___XXXXXXXXXX____XXXXXXXXXX\n_____XXXXXXXXXX_XXXXXXXXX\n_______XXXXXXXXXXXXXXXXX\n________XXXXXXXXXXXXXXXX\n_______XXXXXXXXXXXXXXXXX\n______XXXXXXXXX_XXXXXXXXX\n_____XXXXXXXXX___XXXXXXXXX\n____XXXXXXXXX_____XXXXXXXXX\n___XXXXXXXXX_______XXXXXXXXX\n_XXXXXXXXX-__________XXXXXXXXX\n.\n.\n.\n_XXXXXXXXXX________XXXXXXXXXX\n__XXXXXXXXXX______XXXXXXXXXX\n___XXXXXXXXXX____XXXXXXXXXX\n_____XXXXXXXXXX_XXXXXXXXX\n_______XXXXXXXXXXXXXXXXX\n________XXXXXXXXXXXXXXXX\n_______XXXXXXXXXXXXXXXXX\n______XXXXXXXXX_XXXXXXXXX\n_____XXXXXXXXX___XXXXXXXXX\n____XXXXXXXXX_____XXXXXXXXX\n___XXXXXXXXX_______XXXXXXXXX\n_XXXXXXXXX-__________XXXXXXXXX\n.\n.\n.\n_XXXXXXXXXX________XXXXXXXXXX\n__XXXXXXXXXX______XXXXXXXXXX\n___XXXXXXXXXX____XXXXXXXXXX\n_____XXXXXXXXXX_XXXXXXXXX\n_______XXXXXXXXXXXXXXXXX\n________XXXXXXXXXXXXXXXX\n_______XXXXXXXXXXXXXXXXX\n______XXXXXXXXX_XXXXXXXXX\n_____XXXXXXXXX___XXXXXXXXX\n____XXXXXXXXX_____XXXXXXXXX\n___XXXXXXXXX_______XXXXXXXXX\n_XXXXXXXXX-__________XXXXXXXXX\n.\n.\n.\nXXXXXXXXXXXXXX\nXXXXXXXXXXXXXX\nXXXXXXXXXXXXXX\n______XXXXX\n______XXXXX\n______XXXXX\n______XXXXX\n______XXXXX\n______XXXXX\n______XXXXX\n______XXXXX\n.\n.\nXXXXXXXXXXXXXX\nXXXXXXXXXXXXXX\nXXXXXXXX\nXXXXXXXX\nXXXXXXXXXXXX\nXXXXXXXXXXXX\nXXXXXXXX\nXXXXXXXX\nXXXXXXXXXXXXXX\nXXXXXXXXXXXXXX\n.\n.\nXXXXXXXX___________XXXX\nXXXXXXXXX__________XXXX\nXXXXX_XXXX_________XXXX\nXXXXX__XXXX________XXXX\nXXXXX___XXXX_______XXXX\nXXXXX____XXXX______XXXX\nXXXXX_____XXXX_____XXXX\nXXXXX______XXXX____XXXX\nXXXXX_______XXXXXXXXXX\nXXXXX________XXXXXXXXXX \n.\n.\nXXXXXXXXXXXXXX\nXXXXXXXXXXXXXX\nXXXXXXXXXXXXXX\n______XXXXX\n______XXXXX\n______XXXXX\n______XXXXX\n______XXXXX\n______XXXXX\n______XXXXX\n______XXXXX\n\n_________XXXXXX\n________XXXXXXXX\n_______XXXXXXXXXX\n______XXXXXXXXXXX\n_____XXXXXXXXXXXX\n____XXXXX_____XXXX\n___XXXXXXXXXXXXXX\n__XXXXXXXXXXXXXXX\n_XXXXX________XXXXX\nXXXXX_________XXXXX\n.\n.\n_____XXXXXXXXXX\n___XXXXXXXXXXXXXX\n_XXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXXX\nXXXXXXX_________XXXXXX\nXXXXXXX\nXXXXXXX\nXXXXXXX\nXXXXXXX\nXXXXXXX_________XXXXXX\nXXXXXXXXXXXXXXXXXXX\n_XXXXXXXXXXXXXXXXXX\n___XXXXXXXXXXXXXXXX\n_____XXXXXXXXXXX\n.\n.\n________XXXXXXX\n________XXXXXXX\n________XXXXXXX\n________XXXXXXX\n________XXXXXXX\n________XXXXXXX\n________XXXXXXX\n________XXXXXXX\n________XXXXXXX\n________XXXXXXX \n________XXXXXXX\n.\n.\n ______XXXXXXXXXXX\n____XXXXXXXXXXXXXX\n___XXXXXXXXXXXXXXXXX\n__XXXX_______________XXXX\n_XXXX_________________XXXX\nXXXX___________________XXXX\nXXXX___________________XXXX\nXXXXX__________________XXXX     \n_XXXXX_________________XXX\n__XXXXX______________XXXX\n___XXXXXXXXXXXXXXxXXX\n_____XXXXXXXXXXXXXX\n_______XXXXXXXXXXX\n.\n.\nXXXXXXXX___________XXXX\nXXXXXXXXX__________XXXX\nXXXXX_XXXX_________XXXX\nXXXXX__XXXX________XXXX\nXXXXX___XXXX_______XXXX\nXXXXX____XXXX______XXXX\nXXXXX_____XXXX_____XXXX\nXXXXX______XXXX____XXXX\nXXXXX_______XXXXXXXXXX\nXXXXX________XXXXXXXXXX",
    "activities": "ПО РЕКЛАМЕ ПИСАТЬ СЮДА - mudota77@yandex.ru / https://vk.com/reklamalida95",
    "mobile_phone": "",
    "home_phone": "",
    "site": "",
    "occupation": {"id": 2773912, "name": "Василий Кандинский", "type": "work"},
    "military": [],
    "university": 2,
    "university_name": "МГУ",
    "faculty": 56452,
    "faculty_name": "Высшая школа государственного аудита",
    "graduation": 2009,
    "education_form": "Очно-заочное отделение",
    "education_status": "Выпускник (магистр)",
    "home_town": "Москва, Марьино",
    "relation": 0,
    "personal": {
      "alcohol": 5,
      "inspired_by": "Сталин",
      "langs": ["Русский"],
      "life_main": 2,
      "people_main": 4,
      "political": 1,
      "religion": "Православие",
      "religion_id": 102,
      "smoking": 5
    },
    "universities": [{
      "chair": 112236,
      "chair_name": "Экономическое отделение",
      "city": 954,
      "country": 1,
      "education_form": "Очно-заочное отделение",
      "education_status": "Выпускник (магистр)",
      "faculty": 56452,
      "faculty_name": "Высшая школа государственного аудита",
      "graduation": 2009,
      "id": 2,
      "name": "МГУ"
    }],
    "schools": [],
    "relatives": [{"type": "sibling", "id": 2226529}, {"type": "sibling", "id": 11108058}, {
      "type": "sibling",
      "id": 194474597
    }]
  }, "id": 42061391, "BDIP": {"BDIP": []}, "score": 30
} as Result;