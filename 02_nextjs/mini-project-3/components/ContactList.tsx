import { getContacts, updateContact } from "@/actions";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Mail } from "lucide-react";
import { StatusEnum } from "@/models/Contact";

interface IContact {
  _id: string;
  updatedAt: Date;
  createdAt: Date;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: StatusEnum;
}

export default async function ContactList() {
    const contacts: IContact[] = await getContacts();
    
  // console.log("CONTACTS: ", contacts);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <div className="flex items-center gap-4">
          <Badge variant="secondary">{contacts.length} messages</Badge>
        </div>
      </div>

      {contacts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <Card key={contact._id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{contact.subject}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      From: {contact.name} ({contact.email})
                    </p>
                  </div>
                  <Badge
                    variant={contact.status === StatusEnum.NEW ? "default" : "secondary"}
                  >
                    {contact.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {contact.message}
                </p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex gap-2">
                    {contact.status === StatusEnum.NEW && (
                      <form
                        action={async () => {
                          "use server";
                          await updateContact(contact._id, StatusEnum.READ);
                        }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          type="submit"
                        >
                          Mark as Read
                        </Button>
                      </form>
                    )}
                    {contact.status === StatusEnum.READ && (
                      <form
                        action={async () => {
                          "use server";
                          await updateContact(contact._id, StatusEnum.REPLIED);
                        }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          type="submit"
                        >
                          Mark as Replied
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
