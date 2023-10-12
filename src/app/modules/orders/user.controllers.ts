//& Create User
// const createUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
//   const user = req.body as User;

//   const result = await emailAuthServices.createUser(user);

//   sendResponse<User>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'user created successfully!',
//     data: result,
//   });
// });

export const userControllers = {
  //   createUser,
};
