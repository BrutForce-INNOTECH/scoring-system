import axios, {AxiosInstance} from "axios";
const cyrillicToTranslitJs = require("cyrillic-to-translit-js")

const FILE_TOKEN = "45e9efce34a84a478f298a80b00b6dae";
const FILE_BASE_URL = 'https://brutforce.kvandake.ru'

interface UploadResult {
  ok: boolean;
  path: string
}

class FileClient {

  private readonly fileClient: AxiosInstance;

  constructor() {
    this.fileClient = axios.create({
      baseURL: FILE_BASE_URL,
      timeout: 1000000,
    });
  }

  async uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    const fileName = cyrillicToTranslitJs().transform(file.name, "_");
    formData.append('file', file, fileName);

    const result = await this.fileClient.post<UploadResult>("/files/upload", formData, {
      params: {
        token: FILE_TOKEN
      }
    });

    return `${FILE_BASE_URL}${result.data.path}?token=${FILE_TOKEN}`
  }
}

const fileClient = new FileClient();

export default fileClient;