type Status = "fulfilled" | "rejected" | "pending";

const statusGenerator = (status: Status, error?: string) => {
  switch (status) {
    case "pending":
      return {
        isPending: true,
        isError: false,
        isSuccess: false,
        error: null,
      };

    case "fulfilled":
      return {
        isPending: false,
        isError: false,
        isSuccess: true,
        error: null,
      };

    case "rejected":
      return {
        isPending: false,
        isError: true,
        isSuccess: false,
        error,
      };
  }
};

export default statusGenerator;
