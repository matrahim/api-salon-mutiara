const response = (status_code, datas, message, res) => {
  res.status(status_code).json({
    payload: {
      status_code: status_code,
      datas: datas,
      message: message,
    },
  });
};
module.exports = response;
