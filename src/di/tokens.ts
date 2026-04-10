export const TOKENS = {
  // Repositories
  AuthRepository: 'AuthRepository',
  TripRepository: 'TripRepository',
  ChatRepository: 'ChatRepository',
  WeatherRepository: 'WeatherRepository',
  PlaceRepository: 'PlaceRepository',

  // Auth UseCases
  LoginUseCase: 'LoginUseCase',
  RegisterUseCase: 'RegisterUseCase',
  GoogleLoginUseCase: 'GoogleLoginUseCase',
  UpdateProfileUseCase: 'UpdateProfileUseCase',

  // Trip UseCases
  GetTripsUseCase: 'GetTripsUseCase',
  CreateTripUseCase: 'CreateTripUseCase',
  DeleteTripUseCase: 'DeleteTripUseCase',

  // Chat/AI UseCases
  SendMessageUseCase: 'SendMessageUseCase',
  CreateSmartPlanUseCase: 'CreateSmartPlanUseCase',

  // Weather UseCases
  GetWeatherForecastUseCase: 'GetWeatherForecastUseCase',

  // Place UseCases
  SearchPlacesUseCase: 'SearchPlacesUseCase',
  GetFeaturedPlacesUseCase: 'GetFeaturedPlacesUseCase',
} as const;
