import { WorkOS } from '@workos-inc/node';
import { NextResponse, NextRequest } from 'next/server';
import { SignJWT } from 'jose';
import { getJwtSecretKey } from '../auth';

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID;
console.log('envs', clientId, workos);

export async function GET(request: Request) {
	const url = new URL(request.url);
	console.log('url', url);

	const code = url.searchParams.get('code') || '';
	console.log('code', code);

	try {
		const { user } = await workos.userManagement.authenticateWithCode({
			clientId: clientId!,
			code: code!
		});
		console.log('user from workos', user);
		const token = await new SignJWT({ user })
			.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
			.setIssuedAt()
			.setExpirationTime('1h') //! maybe we should make this longer?
			.sign(getJwtSecretKey());

		// remove the code from the redirect URL
		url.searchParams.delete('code');
		url.pathname = '/dashboard';

		const response = NextResponse.redirect(url);

		response.cookies.set({
			name: 'token',
			value: token,
			httpOnly: true,
			path: '/'
		});

		return response;
	} catch (error) {
		console.log('error from workos', error);
		return NextResponse.json(error);
	}
}
