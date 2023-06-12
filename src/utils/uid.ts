export const uniqueIdGenerator = () => {
  const timestamp = Date.now().toString(16);
  const randomStr = Math.random().toString(16).slice(2, 6);
  return `${timestamp}-${randomStr}`;
};
