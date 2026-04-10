import { container } from './container';
import { TOKENS } from './tokens';

// --- Repositories ---
import { AuthRepositoryImpl } from '../data/repositories/authRepositoryImpl';
import { TripRepositoryImpl } from '../data/repositories/tripRepositoryImpl';
import { ChatRepositoryImpl } from '../data/repositories/chatRepositoryImpl';
import { WeatherRepositoryImpl } from '../data/repositories/weatherRepositoryImpl';
import { PlaceRepositoryImpl } from '../data/repositories/placeRepositoryImpl';

// --- Auth UseCases ---
import { LoginUseCase } from '../domain/usecases/LoginUseCase';
import { RegisterUseCase } from '../domain/usecases/RegisterUseCase';
import { GoogleLoginUseCase } from '../domain/usecases/GoogleLoginUseCase';
import { UpdateProfileUseCase } from '../domain/usecases/UpdateProfileUseCase';

// --- Trip UseCases ---
import { GetTripsUseCase } from '../domain/usecases/GetTripsUseCase';
import { CreateTripUseCase } from '../domain/usecases/CreateTripUseCase';
import { DeleteTripUseCase } from '../domain/usecases/DeleteTripUseCase';

// --- Chat/AI UseCases ---
import { SendMessageUseCase } from '../domain/usecases/SendMessageUseCase';
import { CreateSmartPlanUseCase } from '../domain/usecases/CreateSmartPlanUseCase';

// --- Weather UseCases ---
import { GetWeatherForecastUseCase } from '../domain/usecases/GetWeatherForecastUseCase';

// --- Place UseCases ---
import { SearchPlacesUseCase } from '../domain/usecases/SearchPlacesUseCase';
import { GetFeaturedPlacesUseCase } from '../domain/usecases/GetFeaturedPlacesUseCase';

export function registerDependencies(): void {
  // Repositories - Singleton (dùng chung 1 instance)
  container.registerSingleton(TOKENS.AuthRepository, () => new AuthRepositoryImpl());
  container.registerSingleton(TOKENS.TripRepository, () => new TripRepositoryImpl());
  container.registerSingleton(TOKENS.ChatRepository, () => new ChatRepositoryImpl());
  container.registerSingleton(TOKENS.WeatherRepository, () => new WeatherRepositoryImpl());
  container.registerSingleton(TOKENS.PlaceRepository, () => new PlaceRepositoryImpl());

  // UseCases - Transient (tạo mới mỗi lần resolve, nhưng inject Singleton repository)
  container.registerTransient(
    TOKENS.LoginUseCase,
    () => new LoginUseCase(container.resolve(TOKENS.AuthRepository)),
  );
  container.registerTransient(
    TOKENS.RegisterUseCase,
    () => new RegisterUseCase(container.resolve(TOKENS.AuthRepository)),
  );
  container.registerTransient(
    TOKENS.GoogleLoginUseCase,
    () => new GoogleLoginUseCase(container.resolve(TOKENS.AuthRepository)),
  );
  container.registerTransient(
    TOKENS.UpdateProfileUseCase,
    () => new UpdateProfileUseCase(container.resolve(TOKENS.AuthRepository)),
  );

  container.registerTransient(
    TOKENS.GetTripsUseCase,
    () => new GetTripsUseCase(container.resolve(TOKENS.TripRepository)),
  );
  container.registerTransient(
    TOKENS.CreateTripUseCase,
    () => new CreateTripUseCase(container.resolve(TOKENS.TripRepository)),
  );
  container.registerTransient(
    TOKENS.DeleteTripUseCase,
    () => new DeleteTripUseCase(container.resolve(TOKENS.TripRepository)),
  );

  container.registerTransient(
    TOKENS.SendMessageUseCase,
    () => new SendMessageUseCase(container.resolve(TOKENS.ChatRepository)),
  );
  container.registerTransient(
    TOKENS.CreateSmartPlanUseCase,
    () => new CreateSmartPlanUseCase(container.resolve(TOKENS.ChatRepository)),
  );

  container.registerTransient(
    TOKENS.GetWeatherForecastUseCase,
    () => new GetWeatherForecastUseCase(container.resolve(TOKENS.WeatherRepository)),
  );

  container.registerTransient(
    TOKENS.SearchPlacesUseCase,
    () => new SearchPlacesUseCase(container.resolve(TOKENS.PlaceRepository)),
  );
  container.registerTransient(
    TOKENS.GetFeaturedPlacesUseCase,
    () => new GetFeaturedPlacesUseCase(container.resolve(TOKENS.PlaceRepository)),
  );
}
