import { APP_CONFIG } from './app.constant'

export const SEO = {
  name: 'БУКМЕЙКЕРСКАЯ КОНТОРА ЦЫГАНОВ.НЕТ',
  description:
    'Самая худшая контора, без вывода денег, с коэффициентами ниже 1, у нас вы точно проиграете',
  url: APP_CONFIG.baseUrl,
  keywords: [
    '1xbet',
    'ставки',
    'цыгане',
    'киберспорт',
    'вынахуйэточитаете',
    'яфанатморгенштерна',
    'лучшие коэффициенты',
    'betboom'
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  }
}

export const NO_INDEX_PAGE = { robots: { index: false, follow: false } }
