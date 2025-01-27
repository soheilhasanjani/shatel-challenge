export type Status = "fulfilled" | "rejected" | "pending";

export interface Query<T> {
  data: T;
  error: string | null;
  isPending: boolean;
  isFulfilled: boolean;
  isRejected: boolean;
}

export const queryMaker = <T>(data: T): Query<T> => {
  return {
    // state
    data: data,
    error: null,
    // status
    isPending: false,
    isFulfilled: false,
    isRejected: false,
  };
};

export const statusGenerator = ({
  status,
  error = null,
}: {
  status: Status;
  error?: string | null;
}): Omit<Query<unknown>, "data"> => {
  switch (status) {
    case "pending":
      return {
        isPending: true,
        isRejected: false,
        isFulfilled: false,
        error: null,
      };

    case "fulfilled":
      return {
        isPending: false,
        isRejected: false,
        isFulfilled: true,
        error: null,
      };

    case "rejected":
      return {
        isPending: false,
        isRejected: true,
        isFulfilled: false,
        error,
      };
  }
};
