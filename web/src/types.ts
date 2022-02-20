import { NextPage } from "next";

export type PageComponent<P> = NextPage<P> & { auth: boolean };
