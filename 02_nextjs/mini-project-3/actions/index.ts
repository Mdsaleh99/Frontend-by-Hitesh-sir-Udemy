"use server";

import connectToDatabase from "@/lib/db";
import ContactModel, { StatusEnum } from "@/models/Contact";
import { revalidatePath, unstable_cache } from "next/cache";

export async function createContact(formData: FormData) {
  try {
    await connectToDatabase();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const subject = formData.get("subject")?.toString();
    const message = formData.get("message")?.toString();
    if (!name || !email || !subject || !message) {
      return;
    }

    const contact = await ContactModel.create({
      name,
      email,
      subject,
      message,
    });
    console.log(contact);

    if (!contact) {
      throw new Error("Contact not created");
    }

    return {
      success: true,
      contactId: contact._id.toString(),
      message: "Contact created successfully",
    };
  } catch (error) {
    const err = error as Error;
    console.error(err);
  }
}

export async function getContacts() {
  try {
    await connectToDatabase();

    const contacts = await ContactModel.find({}).sort({ createdAt: -1 }).lean();
    console.log(contacts);

    if (!contacts) {
      throw new Error("Contact not created");
    }

    return contacts.map((contact) => ({
      ...contact,
      _id: contact._id.toString(),
      updatedAt: contact.updatedAt,
      createdAt: contact.createdAt,
    }));
  } catch (error) {
    const err = error as Error;
    console.error(err);
    return []
  }
}

export async function updateContact(contactId: string, status: StatusEnum ) {
  try {
    await connectToDatabase();

    const contact = await ContactModel.findByIdAndUpdate(contactId, { status }, { new: true });
    revalidatePath("/contacts")

    console.log(contact);

    if (!contact) {
      throw new Error("Contact not created");
    }

    return contact
  } catch (error) {
    const err = error as Error;
    console.error(err);
  }
}

export async function getContactStats() {
  const getCahcedStats = unstable_cache(
    async () => {
      await connectToDatabase();
      const totalContacts = await ContactModel.countDocuments();
      const newContacts = await ContactModel.countDocuments({
        status: StatusEnum.NEW,
      });
      const readContacts = await ContactModel.countDocuments({
        status: StatusEnum.READ,
      });
      const repliedContacts = await ContactModel.countDocuments({
        status: StatusEnum.REPLIED,
      });
     
      
      return {
        totalContacts,
        newContacts,
        readContacts,
        repliedContacts,
      }
    },
    ["contact-stats"],
    {tags: ["contact-stats"]}
  )

  return getCahcedStats()
}