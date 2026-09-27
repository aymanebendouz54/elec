<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;
use App\Models\QuoteRequest;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
            'lang' => 'nullable|string',
            'items' => 'nullable|array'
        ]);

        // Enregistrer dans la base de données
        QuoteRequest::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'message' => $validated['message'],
            'items' => $request->items ?? []
        ]);

        try {
            Mail::to('aymanebendouz54@gmail.com')->send(new ContactMail($validated));

            $subject = ($validated['lang'] ?? 'fr') === 'ar' ? 'شكراً لتواصلكم مع BendouzElec' : 'Merci de votre contact - BendouzElec';
            $content = ($validated['lang'] ?? 'fr') === 'ar' 
                ? "مرحباً {$validated['name']}، لقد استلمنا رسالتكم وسنتصل بكم قريباً."
                : "Bonjour {$validated['name']}, nous avons bien reçu votre message et nous reviendrons vers vous dans les plus brefs délais.";

            Mail::raw($content, function ($message) use ($validated, $subject) {
                $message->to($validated['email'])->subject($subject);
            });

            return response()->json(['message' => 'Demande envoyée avec succès !'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Enregistré, mais erreur email.'], 201);
        }
    }

    public function index()
    {
        return QuoteRequest::orderBy('created_at', 'desc')->get();
    }

    public function destroy($id)
    {
        QuoteRequest::findOrFail($id)->delete();
        return response()->json(['message' => 'Supprimé !']);
    }
}
