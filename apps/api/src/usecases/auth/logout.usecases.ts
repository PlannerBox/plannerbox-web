export class LogoutUseCases {
  constructor() {}

  async execute(): Promise<string[]> {
    return [
      'session=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
