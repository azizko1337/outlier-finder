import { ref } from "vue";

export function usePerformance() {
  const time = ref(0);

  function measure<T>(fn: () => T): T {
    // unique ids
    const startMark = `performance-start-${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    const endMark = `performance-end-${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    performance.mark(startMark);
    const result = fn();
    performance.mark(endMark);
    performance.measure("performance-measure", startMark, endMark);

    const measureEntry = performance
      .getEntriesByName("performance-measure")
      .pop();
    time.value = measureEntry
      ? Math.round((measureEntry.duration || 0) * 100) / 100
      : 0;

    // cleanup
    performance.clearMarks(startMark);
    performance.clearMarks(endMark);
    performance.clearMeasures("performance-measure");

    return result;
  }

  return { time, measure };
}
