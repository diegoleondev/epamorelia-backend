export default async function EHModel<R>(cb: () => Promise<R>) {
  try {
    const result = await cb();

    return {
      data: result,
      details: {},
      success: true,
    } as const;
  } catch (error) {
    console.log("[*] ERROR HANDLER MODEL");
    console.log(error);

    return {
      data: null,
      details: {
        _: "UNKNOWN",
      },
      success: false,
    } as const;
  }
}
