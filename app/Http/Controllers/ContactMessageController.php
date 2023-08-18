<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactMessage;
use App\Models\User;

class ContactMessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:contact-messages.index')->only('index');
        $this->middleware('can:contact-messages.show')->only('show');
        $this->middleware('can:contact-messages.store')->only('store');
        $this->middleware('can:contact-messages.getUserContactMessages')->only('getUserContactMessages');
    }

    public function index()
    {
        $contactMessages = ContactMessage::all();
        return response()->json($contactMessages);
    }

    public function store(Request $request)
    {
        $contactMessage = ContactMessage::create($request->all());
        if(!$request->guest_email){
            $contactMessage->user_email = auth()->user()->email;
            $contactMessage->save();
        }
        return response()->json([
            'message' => 'Su mensaje ha sido enviado. ¡Gracias por contactar!.',
            'contactMessage' => $contactMessage
        ]);
    }

    public function show(ContactMessage $contactMessage)
    {
        return response()->json($contactMessage);
    }

    public function getUserContactMessages($id)
    {
        $user = User::find($id);
        $contactMessages = $user->contactMessages;
        return response()->json($contactMessages);
    }

    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();
        return response()->json([
            'message' => 'Mensaje eliminado correctamente.'
        ]);
    }
}
