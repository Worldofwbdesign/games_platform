export const isLoggedIn = (model, next, redirect) => {
  const loggedIn = model.get('_session.loggedIn')
  if (!loggedIn) return redirect('/auth/sign-up/professor')
  next()
}

export const isProfessor = async (model, next, redirect) => {
  const loggedIn = model.get('_session.loggedIn')
  if (!loggedIn) return redirect('/auth/sign-up/professor')
  next()
}
