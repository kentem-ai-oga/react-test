import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://testURL', () => {
    return HttpResponse.json({
      data: {
        id: '9784167158057',
        name: '吾輩は猫である',
        isOnLoan: false,
      },
    });
  }),
];
