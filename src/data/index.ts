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
import { goroutineLeaksEn, goroutineLeaksZh } from './topics/goroutine-leaks';
import { nilInterfaceTrapEn, nilInterfaceTrapZh } from './topics/nil-interface-trap';
import { stringsBytesRunesEn, stringsBytesRunesZh } from './topics/strings-bytes-runes';
import { forRangeTrapEn, forRangeTrapZh } from './topics/for-range-trap';
import { goSchedulerEn, goSchedulerZh } from './topics/go-scheduler';
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
    nilInterfaceTrapEn,
    forRangeTrapEn,
    goSchedulerEn,
    // Concurrency (extra)
    goroutineLeaksEn,
    // Basics (extra)
    stringsBytesRunesEn,
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
    nilInterfaceTrapZh,
    forRangeTrapZh,
    goSchedulerZh,
    // 并发（补充）
    goroutineLeaksZh,
    // 基础（补充）
    stringsBytesRunesZh,
  ],
};
