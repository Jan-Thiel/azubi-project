import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore, StoreModule } from '@ngrx/store';
import { vehiclesReducer } from './state/vehicles.reducer';
import { provideEffects } from '@ngrx/effects';
import { VehiclesEffects } from './effects/vehicles.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideStore(), importProvidersFrom(StoreModule.forRoot({ vehicles: vehiclesReducer })),
    provideEffects(VehiclesEffects)
]
};
