<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        $itemsHtml = "";
        if (isset($this->data['items']) && is_array($this->data['items'])) {
            $itemsHtml = "<h3>Services/Articles demandés:</h3><ul>";
            foreach ($this->data['items'] as $item) {
                $itemsHtml .= "<li>" . ($item['desc'] ?? '') . " (x" . ($item['qty'] ?? 1) . ")</li>";
            }
            $itemsHtml .= "</ul>";
        }

        return $this->subject('Nouvelle Demande de Devis - BendouzElec')
                    ->html("
                        <h2>Nouvelle demande de devis reçue</h2>
                        <p><strong>Nom:</strong> {$this->data['name']}</p>
                        <p><strong>Email:</strong> {$this->data['email']}</p>
                        <p><strong>Message:</strong></p>
                        <p>{$this->data['message']}</p>
                        {$itemsHtml}
                    ");
    }
}
