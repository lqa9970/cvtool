export const uniqueIdGenerator = () => {
  const timestamp = Date.now().toString(16);
  const randomStr = Math.random().toString(16).substring(2, 6);
  const uuid = `${timestamp}-${randomStr}`;
  return uuid;
};
