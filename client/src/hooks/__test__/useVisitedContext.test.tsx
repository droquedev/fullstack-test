import { renderHook } from "@testing-library/react-hooks";
import { MockedFunction, beforeAll, describe, expect, it, vi } from "vitest";
import { VisitedContextProvider } from "../../context/VisitedContextProvider";
import { useVisitedContext } from "../useVisitedContext";

describe("useVisitedContext", () => {
  const wrapper = ({ children }: any) => (
    <VisitedContextProvider>{children}</VisitedContextProvider>
  );

  beforeAll(() => {
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    };

    global.localStorage = localStorageMock;
  });

  it("should return empty object as default", () => {
    const result = renderHook(() => useVisitedContext());
    expect(result.result.current.visited).toEqual({});
  });

  vi.fn();
  it("should return visited objects from localStorage", () => {
    const visited = { "1": true, "2": true };

    (
      global.localStorage.getItem as MockedFunction<typeof localStorage.getItem>
    ).mockReturnValue(JSON.stringify(visited));

    const hook = renderHook(() => useVisitedContext(), { wrapper });

    expect(global.localStorage.getItem).toBeCalledWith("visited");

    expect(hook.result.current.visited).toEqual(visited);
  });

  it("should add visited object to localStorage", () => {
    (
      global.localStorage.getItem as MockedFunction<typeof localStorage.getItem>
    ).mockReturnValue(JSON.stringify({}));
    const hook = renderHook(() => useVisitedContext(), { wrapper });

    hook.result.current.addVisited("3");

    expect(global.localStorage.setItem).toBeCalledWith(
      "visited",
      JSON.stringify({ "3": true }),
    );

    expect(hook.result.current.visited).toEqual({ "3": true });
  });
});
