export const isLoggedIn = (model, next, redirect) => {
  const loggedIn = model.get('_session.loggedIn')
  if (!loggedIn) return redirect('/auth/signup')
  next()
}
