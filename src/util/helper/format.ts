export const formatMockResponse = (data: any) => {
  try {
    return {
      data,
      status: 200,
      message: "Success",
    };
  } catch (error) {
    return {
      data: [],
      status: 400,
      message: "Something went wrong!",
    };
  }
};
