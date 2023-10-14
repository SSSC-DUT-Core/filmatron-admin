"use client"
import { CreditCard, DollarSign, Package } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { useEffect } from "react";
import { Role, useSignInWithSocialMutation } from "@/graphql/generated";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
};

const DashboardPage = async () => {
  const [signInWithSocialMutation, { data, loading, error }] = useSignInWithSocialMutation();
  useEffect(() => {
      if (localStorage.getItem("access_token")) {
          signInWithSocialMutation(
              {
                  variables: {
                      input: { 
                          publicKey: "test",
                          role: Role.Filmmaker
                       },
                  },
                  context: {
                      headers: {
                          Authorization:localStorage.getItem("access_token"),
                      },
                  },
              }
           
          )
      }
  }, []);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of Filmatron" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
