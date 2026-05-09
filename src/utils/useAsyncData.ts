import { type DependencyList, useEffect, useState } from "react";

type AsyncState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export function useAsyncData<T>(
  loader: () => Promise<{ data: T; error: { message: string } | null }>,
  deps: DependencyList = [],
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    Promise.resolve()
      .then(() => {
        if (isMounted) {
          setState((current) => ({ ...current, loading: true, error: null }));
        }
        return loader();
      })
      .then(({ data, error }) => {
        if (!isMounted) return;
        setState({ data, error: error?.message ?? null, loading: false });
      })
      .catch((error: unknown) => {
        if (!isMounted) return;
        setState({
          data: null,
          error: error instanceof Error ? error.message : "Terjadi kesalahan saat memuat data.",
          loading: false,
        });
      });

    return () => {
      isMounted = false;
    };
    // The caller owns the dependency list because loaders are usually inline route-param closures.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
