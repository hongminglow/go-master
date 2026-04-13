import { introToGoEn, introToGoZh } from './topics/intro-go';
import { goroutinesEn, goroutinesZh } from './topics/goroutines';
import { channelsEn, channelsZh } from './topics/channels';
import { contextEn, contextZh } from './topics/context';
import { variablesTypesEn, variablesTypesZh } from './topics/variables-types';
import { functionsEn, functionsZh } from './topics/functions';
import { structsMethodsEn, structsMethodsZh } from './topics/structs-methods';
import { interfacesEn, interfacesZh } from './topics/interfaces';
import { slicesMapsEn, slicesMapsZh } from './topics/slices-maps';
import { errorHandlingEn, errorHandlingZh } from './topics/error-handling';
import { genericsEn, genericsZh } from './topics/generics';
import { syncPrimitivesEn, syncPrimitivesZh } from './topics/sync-primitives';
import { testingEn, testingZh } from './topics/testing';
import { modulesPackagesEn, modulesPackagesZh } from './topics/modules-packages';
import { performanceEn, performanceZh } from './topics/performance-tips';
import { httpServerEn, httpServerZh } from './topics/http-server';
import type { ContentNode } from './types';
import type { Language } from '@/store/useLanguageStore';

export { categories } from './categories';
export * from './types';

export const allTopics: Record<Language, ContentNode[]> = {
  en: [
    // Introduction to Go
    introToGoEn,
    modulesPackagesEn,
    // Go Basics
    variablesTypesEn,
    functionsEn,
    structsMethodsEn,
    interfacesEn,
    slicesMapsEn,
    errorHandlingEn,
    // Concurrency
    goroutinesEn,
    channelsEn,
    syncPrimitivesEn,
    contextEn,
    // Advanced Topics
    genericsEn,
    testingEn,
    performanceEn,
    httpServerEn,
  ],
  zh: [
    // Go 入门
    introToGoZh,
    modulesPackagesZh,
    // Go 基础
    variablesTypesZh,
    functionsZh,
    structsMethodsZh,
    interfacesZh,
    slicesMapsZh,
    errorHandlingZh,
    // 并发
    goroutinesZh,
    channelsZh,
    syncPrimitivesZh,
    contextZh,
    // 进阶
    genericsZh,
    testingZh,
    performanceZh,
    httpServerZh,
  ],
};
