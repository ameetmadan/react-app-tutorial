type AuthUserType = 'anonymous' | 'authenticated';
// The authenticated user can be either anonymous or authenticated
type GenericUser<T extends AuthUserType, Payload extends object = {}> = {
    type: T;
} & Payload;
// With using a "GenericUser" type, we generalize the type for easy reuse
type UserData = { id: string; username: string };
// The user has 2 subfields, id and username
export type AnonymousAuthUser = GenericUser<'anonymous'>;
// Here we are reusing the GenericUser type
export type AuthenticatedAuthUser = GenericUser<'authenticated', { apiKey: string; data: UserData }>;
// Because the authenticated user needs to have UserData, we are sending the "Payload as object"
export type AuthUser = AnonymousAuthUser | AuthenticatedAuthUser;
// Finally, we use type AuthUser to catch both anonymous and authenticated users
